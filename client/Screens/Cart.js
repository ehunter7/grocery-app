import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Component for individual grocery list item
import ListItem from "../components/ListItem";

import API from "../utils/api";
import { useStateContext } from "../utils/GlobalState";

export default function Cart() {
  // state for new item being added
  const [newItem, setNewItem] = useState({
    itemName: "",
    itemChecked: false,
    itemArea: "",
  });

  //state for new  item input field
  const [newItemInputField, setNewItemInputField] = useState(false);

  //CART contains the imported grocery list
  //! This will not be needed when switching SectionList from local state to global state.
  const [CART, setCart] = useState([]);

  //ToggleChecked is used to determine if the drop down arrow will area or not
  const [toggleChecked, setToggleChecked] = useState({
    status: false,
    currentArea: "",
    //area contains location in the grocery store that has items checked off
    area: [],
    hidden: true,
  });

  const [state, dispatch] = useStateContext();

  function addItem() {
    setNewItemInputField(!newItemInputField);
  }

  useEffect(() => {
    setCart(state.cartItems); //! This is important
    //? Might not need to setr state if im just pulling from global
    // setArray(); //This is how i was originally setting the cart
  }, [state]); // run on Mount

  function setArray() {
    let areaArray = [];

    if (CART.length) {
      areaArray = CART;
    } else {
      //Iterates through the database cartItems to transfer to new array
      state.cartItems.forEach((element, index) => {
        //Capitalize the first letter of the location
        const location =
          element.itemArea.charAt(0).toUpperCase() + element.itemArea.slice(1);

        //used as a token to track if an item has been pushed to areaArray
        let pushed = false;

        //If areaArea, which contains the contents for each area, is not empty
        if (!areaArray.length) {
          areaArray.push({
            area: location,
            itemChecked: element.itemChecked,
            itemCheckedCount: element.itemChecked ? 1 : 0,
            data: [
              {
                id: element._id,
                name: element.itemName,
                checked: element.itemChecked,
                area: location,
              },
            ],
          });
        } else {
          //areaArray is not empty, check if incoming area exists in array
          areaArray.forEach((item) => {
            if (element.itemArea.toLowerCase() === item.area.toLowerCase()) {
              let isChecked = false;
              if (item.itemchecked || element.itemChecked) {
                isChecked = true;
              } else {
                isChecked = false;
              }
              //If location is already in array, push item to location
              item.data.push({
                id: element._id,
                name: element.itemName,
                //TODO: increment total items
                checked: element.itemChecked,
                area: location,
              });

              pushed = true; //Item has been added to array
            }
          });

          //if area was not found, push new location to areaArray
          if (!pushed) {
            areaArray.push({
              area: element.itemArea,
              //TODO: Add total items
              itemChecked: element.checked,
              itemCheckedCount: 0,
              data: [
                {
                  id: element._id,
                  name: element.itemName,
                  checked: element.itemChecked,
                  area: element.itemArea,
                },
              ],
            });
          }
        }
      });
    } // end of if statement
    // set list to modified array
    setCart(areaArray);
    //reset temp array
    areaArray = [];
  }

  //handles when user checks off item on list
  //Passes in e which is the item being checked off
  function handlePress(e) {
    //TODO: need to change variable e to something more descriptive

    //UpdatedCART contains modified list after item is checked off list
    const updatedCART = CART.map((item) => {
      //Finds the item that has been checked off in the list and changes its "Checked" status

      //Used to track how many items have been chekced off.
      let count;
      const newItem = item.data.map((item) => {
        //! Should have used another variable other than item due to it being used for first map
        if (item.name === e.name) {
          //When item is found in array set checked value
          return { ...item, checked: !item.checked };
        }
        //otherwise return item as is
        return item;
      });

      //Finds the location which the item being checked off is located in and increments or decrements count of checked off items
      if (item.area === e.area) {
        // If item is already checked off and user is unchecking it, remove the area from the areaArray
        if (e.checked) {
          //If item is being unchecked, decrement count
          count = item.itemCheckedCount - 1;
          var token = true;
          const newData = toggleChecked.area.filter((item) => {
            if (item === e.area && token) {
              token = false;
              return null;
            }
            return item;
          });
          setToggleChecked({
            ...toggleChecked,
            area: newData,
          });
        } else {
          //item was not checked
          //If item is being chekced off, increment count
          count = item.itemCheckedCount + 1;

          const newData = toggleChecked.area.concat(e.area);
          setToggleChecked({
            ...toggleChecked,
            area: newData,
          });
        } //End of checked or unchecked check, still within area

        //If there is an item checked in locations list, set checked to true otherwise set to false
        let checked = count > 0;

        return {
          ...item,
          itemChecked: checked,
          itemCheckedCount: count,
          data: newItem,
        };
      } else {
        return { ...item, data: newItem };
      }
    }); //End of updatedCART .map method
    //sets the grocery list state to new updated list
    setCart(updatedCART);
    API.Checkoff(e, state.cartItems).then((res) => {
      // console.log(res.data.cart);
      // setArray();
    });
    //dispatch({ type: "set-cart-item", payload: [updatedCART] });
  }

  // Handles drop down arrow press, used for displaying checked off items
  function handleDropDown(section) {
    var curArea = "";

    if (toggleChecked.currentArea === "") {
      //If location string is empty, set string to location
      curArea = section.area;
    } else if (!toggleChecked.currentArea.includes(section.area)) {
      //If location string is not empty and location being opened up has not been added, add location to string
      curArea = toggleChecked.currentArea + section.area;
    } else {
      //If loaction string has location in it, remove and replace with nothing
      curArea = toggleChecked.currentArea.replace(section.area, "");
    }
    //Sets state toggleChecked current area to string curArea
    setToggleChecked({
      ...toggleChecked,
      currentArea: curArea,
    });
  }

  //TODO: this needs to be an individual component
  //Generates location drop down icon, function runs for every location in list
  function areaDropDown(section) {
    //If current area in iteration is in area that has item checked off and no items have been checked off
    // && section.itemCheckedCount > 0
    if (toggleChecked.area.includes(section.area)) {
      return (
        <Text style={styles.dropdown} onPress={() => handleDropDown(section)}>
          {/* toggleChecked.status && */}
          {toggleChecked.currentArea.includes(section.area) ? (
            <FontAwesome name="angle-up" size={24} color="black" />
          ) : (
            <FontAwesome name="angle-down" size={24} color="black" />
          )}
        </Text>
      );
    } else {
      return null;
    }
  }

  // Would like to try to make this and all funciton pure
  function handleNewItemInput() {
    console.log(newItem);
    if (newItem.itemName !== "" && newItem.itemArea !== "") {
      const newCart = state.cartItems.concat(newItem);
      console.log("Hey now!");
      API.AddItem(newItem).then((res) => {
        // dispatch({ type: "add-item", payload: res.data.cart });
        // setArray();
      });
    } else {
      console.log("No item entered");
    }
  }

  return (
    <>
      <View style={{ marginTop: 55 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              marginRight: 100, //TODO: need to try harder
            }}
          >
            Grocery List
          </Text>
          <TouchableOpacity>
            <Ionicons
              onPress={() => addItem()}
              name="add"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {!newItemInputField ? null : (
          <>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setNewItem({
                    ...newItem,
                    itemName: text,
                    itemChecked: false,
                  });
                }}
                value={newItem.itemName}
                placeholder="Item name..."
                keyboardType="default"
                clearButtonMode="always"
              />
              {/* New item location input */}
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setNewItem({
                    ...newItem,
                    itemArea: text,
                    itemChecked: false,
                  });
                }}
                value={newItem.itemArea}
                placeholder="location in store..."
                keyboardType="default"
                clearButtonMode="always"
              />
              <MaterialCommunityIcons
                style={{ marginTop: 5, marginLeft: 8 }}
                name="cart-arrow-down"
                size={24}
                color="black"
                onPress={() => {
                  handleNewItemInput();
                  setNewItem({ name: "", area: "" });
                }}
              />
            </View>
          </>
        )}
        <SectionList
          sections={CART}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section }) => {
            return (
              <View style={styles.container}>
                <Text style={styles.sectionHeader}>{section.area}</Text>
                {section.itemCheckedCount > 0 ? (
                  <Text
                    style={styles.itemsDown}
                  >{`${section.itemCheckedCount} Down`}</Text>
                ) : null}
                {areaDropDown(section)}
              </View>
            );
          }}
          renderItem={({ item }) => {
            if (
              !item.checked ||
              toggleChecked.currentArea.includes(item.area)
            ) {
              return <ListItem item={item} handlePress={handlePress} />;
            } else {
              return null;
            }
          }}
        />
      </View>
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      ></View>
    </>
  );
}
var { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    marginLeft: "auto",
    paddingRight: 20,
    paddingTop: 15,
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    width: "66%",
  },
  itemsDown: {
    marginLeft: "auto",
    paddingTop: 12,
    fontSize: 10,
    fontStyle: "italic",
  },
  input: {
    width: "43.5%",
    height: 35,
    // margin: 12,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 10,
    marginLeft: 2,
  },
});
