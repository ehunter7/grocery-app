import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Component for individual grocery list item
import ListItem from "../components/ListItem";
import AppTabs from "../components/AppTabs";

export default function Cart() {
  //CART contains the imported grocery list
  const [CART, setCart] = useState([]);

  //ToggleChecked is used to determine if the drop down arrow will area or not
  const [toggleChecked, setToggleChecked] = useState({
    status: false,
    currentArea: "",
    //area contains location in the grocery store that has items checked off
    area: [],
    hidden: true,
  });

  // const [curArea, setCurArea] = useState("");

  //cartItems used for development
  const cartItems = [
    {
      name: "Milk",
      checked: false,
      area: "Refrigerator",
    },
    {
      name: "Eggs",
      checked: false,
      area: "Refrigerator",
    },
    {
      name: "Pizza",
      checked: false,
      area: "Frozen",
    },
    {
      name: "Bread",
      checked: false,
      area: "Pantry",
    },
    {
      name: "Bell Pepper",
      checked: false,
      area: "refrigerator",
    },
  ];

  useEffect(() => {
    let areaArray = [];

    //Iterates through the hard coded cartItems to transfer to new array
    cartItems.forEach((element, index) => {
      //Capitalize the first letter of the location
      const location =
        element.area.charAt(0).toUpperCase() + element.area.slice(1);

      //used as a token to track if an item has been pushed to areaArray
      let pushed = false;

      //If areaArea, which contains the contents for each area, is not empty
      if (!areaArray.length) {
        areaArray.push({
          area: location,
          itemChecked: element.checked,
          itemCheckedCount: 0,
          data: [
            {
              name: element.name,
              checked: element.checked,
              area: location,
            },
          ],
        });
      } else {
        //areaArray is not empty, check if incoming area exists in array
        areaArray.forEach((item) => {
          if (element.area.toLowerCase() === item.area.toLowerCase()) {
            //If location is already in array, push item to location
            item.data.push({
              name: element.name,
              //TODO: increment total items
              checked: element.checked,
              area: location,
            });
            pushed = true; //Item has been added to array
          }
        });

        //if area was not found, push new location to areaArray
        if (!pushed) {
          areaArray.push({
            area: element.area,
            //TODO: Add total items
            itemChecked: element.checked,
            itemCheckedCount: 0,
            data: [
              {
                name: element.name,
                checked: element.checked,
                area: element.area,
              },
            ],
          });
        }
      }
    });
    // set list to modified array
    setCart(areaArray);

    //reset temp array
    areaArray = [];
  }, []); // run on Mount

  //handles when user checks off item on list
  //Passes in e which is the item being checked off
  function handlePress(e) {
    //TODO: need to change variable e to something more descriptive
    //UpdatedCART contains modified list after item is checked off list
    const updatedCART = CART.map((item) => {
      //Finds the item that has been checked off in the list and shanges its "Checked" status
      const newItem = item.data.map((item) => {
        if (item.name === e.name) {
          //When item is found in array set checked value
          return { ...item, checked: !item.checked };
        }
        //otherwise return item as is
        return item;
      });

      //Finds the location which the item being checked off is located in and increments or decrements count of checked off items
      if (item.area === e.area) {
        //Used to track how many items have been chekced off.
        let count;

        // If item is already checked off and user is unchecking it, remove the area from tthe areaArray
        if (e.checked) {
          //If item is being unchecked, decrement count
          count = item.itemCheckedCount - 1;
          console.log("toggleChecked.area", toggleChecked.area);
          setToggleChecked({
            ...toggleChecked,
            area: toggleChecked.area.splice(
              toggleChecked.area.indexOf(e.area),
              1
            ),
          });
          console.log("toggleChecked.area [after]", toggleChecked.area);

          //TODO: Need to figure out why i called this here
          console.log("e", e);
          areaDropDown(e);
        } else {
          //item was not checked
          //If item is being chekced off, increment count
          count = item.itemCheckedCount + 1;

          setToggleChecked({
            ...toggleChecked,
            area: toggleChecked.area.concat(e.area),
          });
        }

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
    //declares variable to pass to hadleDropdown, //!Should be declared in handleDropdown
    //TODO: Move variable curArea to handleDropdown

    //If current area in iteration is in area that has item checked off and no items have been checked off
    // && section.itemCheckedCount > 0
    console.log("toggleChecked.area", toggleChecked.area);
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

  return (
    <>
      <View>
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
    </>
  );
}

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
});
