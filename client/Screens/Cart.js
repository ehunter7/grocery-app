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
        //Add location in store to array
        areaArray.push({
          area: location,
          //TODO: Add total items
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
          return { ...item, checked: !item.checked };
        }
        return item;
      });

      //Finds the location which the item being checked off is located in and increments or decrements count of checked off items
      if (item.area === e.area) {
        //Used to track how many items have been chekced off.
        let count;

        //If item is being unchecked, decrement count
        //If item is being chekced off, increment count
        {
          e.checked
            ? (count = item.itemCheckedCount - 1)
            : (count = item.itemCheckedCount + 1);
        }

        //If there is an item checked in locations list, set checked to true
        let checked;
        {
          count > 0 ? (checked = true) : (checked = false);
        }
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
    //**************************************!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    //? I think i should be able to move this code up into above if statement
    if (e.checked) {
      console.log("checked_________________");
      console.log("should remove refrig", e.area);
      setToggleChecked({
        ...toggleChecked,
        area: toggleChecked.area.splice(toggleChecked.area.indexOf(e.area), 1),
      });
      areaDropDown(e);
    } else {
      console.log("NOT CHECKED");
      console.log("adding ", e.area);
      setToggleChecked({
        ...toggleChecked,
        area: toggleChecked.area.concat(e.area),
      });
    }
  }

  function handleDropDown(section, curArea) {
    if (toggleChecked.currentArea === "") {
      curArea = section.area;
    } else if (!toggleChecked.currentArea.includes(section.area)) {
      curArea = toggleChecked.currentArea + section.area;
    } else {
      curArea = toggleChecked.currentArea.replace(section.area, "");
    }
    setToggleChecked({
      ...toggleChecked,
      currentArea: curArea,
    });
  }

  function areaDropDown(section) {
    var curArea = "";
    console.log("---------------------------");
    console.log("toggleChecked.area", toggleChecked.area);
    console.log("section.area", section.area);
    if (
      toggleChecked.area.includes(section.area) &&
      section.itemCheckedCount > 0
    ) {
      console.log("Drop");
      return (
        <Text
          style={styles.dropdown}
          onPress={() => handleDropDown(section, curArea)}
        >
          {toggleChecked.status &&
          toggleChecked.currentArea.includes(section.area) ? (
            <FontAwesome name="angle-up" size={24} color="black" />
          ) : (
            <FontAwesome name="angle-down" size={24} color="black" />
          )}
        </Text>
      );
    } else {
      console.log("no drop");
      return null;
    }
  }

  return (
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
          if (!item.checked || toggleChecked.currentArea.includes(item.area)) {
            return <ListItem item={item} handlePress={handlePress} />;
          } else {
            return null;
          }
        }}
      />
      {console.log("---------------------XXX")}
    </View>
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
