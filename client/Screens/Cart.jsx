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
  //TODO: Switch this to use formik form
  const [newItem, setNewItem] = useState({
    itemName: "",
    itemChecked: false,
    itemArea: "",
  });

  //state for new  item input field
  const [newItemInputField, setNewItemInputField] = useState(false);

  //ToggleChecked is used to determine if the drop down arrow will area or not
  const [toggleChecked, setToggleChecked] = useState({
    status: false,
    currentArea: "",
    //area contains location in the grocery store that has items checked off
    area: [],
    hidden: true,
  });

  const [state, dispatch] = useStateContext();
  console.log("-----------------------------");
  console.log(state.cartItems.cart);
  console.log("-----------------------------");

  function addItem() {
    setNewItemInputField(!newItemInputField);
  }

  //handles when user checks off item on list
  //Passes in e which is the item being checked off
  function handlePress(incomingItem) {
    //TODO: need to change variable e to something more descriptive

    //UpdatedCART contains modified list after item is checked off list
    const updatedCART = state.cartItems.cart.map((cartObject) => {
      //Finds the item that has been checked off in the list and changes its "Checked" status

      //Used to track how many items have been chekced off.
      let count;
      const newItem = cartObject.data.map((cartItem) => {
        if (cartItem.name === incomingItem.name) {
          //When item is found in array set checked value
          return { ...cartItem, checked: !cartItem.checked };
        }
        //otherwise return item as is
        return cartItem;
      });

      //Finds the location which the item being checked off is located in and increments or decrements count of checked off items
      if (cartObject.area === incomingItem.area) {
        // If item is already checked off and user is unchecking it, remove the area from the areaArray
        if (incomingItem.checked) {
          //If item is being unchecked, decrement count
          count = cartObject.itemCheckedCount - 1;
          var token = true;
          const newData = toggleChecked.area.filter((item) => {
            if (item === incomingItem.area && token) {
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
          count = cartObject.itemCheckedCount + 1;

          const newData = toggleChecked.area.concat(incomingItem.area);
          setToggleChecked({
            ...toggleChecked,
            area: newData,
          });
        } //End of checked or unchecked check, still within area

        //If there is an item checked in locations list, set checked to true otherwise set to false
        let checked = count > 0;

        return {
          ...cartObject,
          itemChecked: checked,
          itemCheckedCount: count,
          data: newItem,
        };
      } else {
        return { ...cartObject, data: newItem };
      }
    }); //End of updatedCART .map method
    //sets the grocery list state to new updated list
    setCart(updatedCART);
    API.Checkoff(incomingItem, state.cartItems).then((res) => {
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
          sections={state.cartItems.cart}
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
