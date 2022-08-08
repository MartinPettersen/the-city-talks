import { StatusBar } from "expo-status-bar";
import { setDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import { StyleSheet, Text, View, Button, TextInput, ScrollView, SafeAreaView  } from "react-native";
import { useState, useEffect } from "react";
import { db } from "./Core/Config";
import axios from "axios";

export default function App() {
  const [cityConversation, setCityConversation] = useState(null);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("anon");
  const [city, setCity] = useState("Metropolis");

  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getData = async () => {
    const response = await axios.get("https://geolocation-db.com/json/");
    setCountry(response.data.country_name);
    setCity(response.data.city);
    setLatitude(response.data.latitude);
    setLongitude(response.data.longitude);
  };

  const createConversation = () => {
    const myDoc = doc(db, "CityChatCollection", "CityChatDocument");

    const docData = {
      conversation: [
        {
          name: "Your City",
          city: "Metropolis",
          comment: "Howdy Foolks",
        },
      ],
    };

    setDoc(myDoc, docData)
      .then(() => {
        alert("Document Created");
      })
      .catch((error) => {
        alert(error.Message);
      });
  };
  const readComments = () => {
    const myDoc = doc(db, "CityChatCollection", "CityChatDocument");

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          setCityConversation(snapshot.data());
        } else {
          alert("Could not find any comments");
        }
      })
      .catch((error) => {
        alert(error.Message);
      });
  };
  const addComment = (value, merge) => {
    const myDoc = doc(db, "CityChatCollection", "CityChatDocument");

    setDoc(myDoc, value, { merge: merge })
      .then(() => {
        setComment("");
        readComments();
      })
      .catch((error) => {
        alert(error.Message);
      });
  };

  useEffect(() => {
    readComments();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const pageStateInterval = setInterval(() => {
      readComments();
    }, 1000);

    return () => clearInterval(pageStateInterval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>The City Talks</Text>
      {/*<Button onPress={createConversation} title="Create New Doc"></Button>
      <Button onPress={readComments} title="Read Doc"></Button>*/}
      <Text style={styles.city}>The Talk of {city}</Text>
      {cityConversation != null && (
        <ScrollView  style={styles.conversationContainer}>
          {cityConversation.conversation
            .filter((comment) => comment.city === city)
            .map((comment, i) => {
              return (
                <View key={i}>
                  {comment.name === username ? (
                    <View style={[styles.me, styles.commentBox]}>
                      <Text style={styles.white}>
                        {comment.name}: {comment.comment}
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.them, styles.commentBox]}>
                      <Text style={styles.white}>
                        {comment.name}: {comment.comment}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
        </ScrollView>
      )}
      <TextInput
        style={styles.textbox}
        placeholder="Comment as: "
        onChangeText={(text) => {
          setUsername(text);
        }}
        value={username}
      ></TextInput>
      <TextInput
        style={styles.textbox}
        placeholder="Join the conversation"
        onChangeText={(text) => {
          setComment(text);
        }}
        value={comment}
      ></TextInput>
      <View style={styles.button}>

      <Button
        onPress={() => {
          addComment(
            {
              conversation: [
                ...cityConversation.conversation,
                {
                  name: username,
                  city: city,
                  comment: comment,
                },
              ],
            },
            true
            );
          }}
          title="Add Comment"
          disabled={comment == ""}
          
          ></Button>
          </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3584E4",
    alignItems: "center",
    justifyContent: "center",
  },
  textbox: {
    width: "80%",
    fontSize: 15,
    borderColor: "#FF7800",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
    color: "#FF7800",
    backgroundColor: "white",
  },
  commentBox: {
    borderColor: "black",
    borderWidth: 0.2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 2,
    fontSize: 15,
    color: "white",
  },
  me: {
    backgroundColor: "#FF7800",
    color: "white",
  },
  them: {
    backgroundColor: "#3584E4",
    color: "red",
  },
  button: {
    borderColor: "black",
    borderWidth: 0.8,
    borderRadius: 10,
    color: "#FF7800",
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#FF7800",
  },
  white: {
    color: "white",
  },
  conversationContainer: {
    width: "80%",
    height: "40%",

    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
    padding: 15,
    marginVertical: 30,
    backgroundColor: "#F6F5F4",
  },
  logo: {
    fontSize: 40,
    color: "#FF7800",
  },
  city: {
    fontSize: 30,
    color: "#FF7800",
  },
});
