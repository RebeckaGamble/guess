import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

export default function HomeScreen() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [winnerMsg, setWinnerMsg] = useState("");
  const [totalWins, setTotalWins] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  const handleGuess = () => {
    const userGuess = parseInt(number, 10);
    if (isNaN(userGuess)) {
      alert("Invalid input, only numbers allowed!");
      return;
    }
    if (userGuess === correctAnswer) {
      setMessage("");
      setWinnerMsg("Congratulations! You guessed the right number!");
      setTotalWins(totalWins + 1);
      setCorrectAnswer(Math.floor(Math.random() * 100) + 1);
    } else if (userGuess < correctAnswer) {
      setWinnerMsg("");
      setMessage("Too low, try again!");
      setTotalGuesses(totalGuesses + 1);
    } else {
      setWinnerMsg("");
      setMessage("To high, try again!");
      setTotalGuesses(totalGuesses + 1);
    }
    setNumber('')
  };

  const resetScoreBoard = () => {
    setTotalWins(0)
    setTotalGuesses(0)
    setMessage('')
    setWinnerMsg('')
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/guess.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Come and play!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Guess a number between 1 - 100 </ThemedText>
      </ThemedView>
      <View style={styles.game}>
        <TextInput
          style={styles.input}
          placeholder="Type your guess"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleGuess} style={styles.guessBtn}>
          <Text style={styles.guessBtnText}>Guess</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.messageContainer}>
        {correctAnswer ? <Text style={styles.message}>{winnerMsg}</Text> : null}
        {message ? <Text style={styles.wrongMessage}>{message}</Text> : null}
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>Total score</Text>
        <Text style={styles.score}>Total guesses: {totalGuesses} </Text>
        <Text style={styles.score}>Total wins: {totalWins}</Text>
        <TouchableOpacity onPress={resetScoreBoard} style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Reset Scoreboard</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: "100%",
    height: 400,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  game: {
    flexDirection: "row",
    gap: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#333533",
    height: 40,
    paddingHorizontal: 10,
    width: "60%",
    fontSize: 20,
    color: '#5E5B52'
  },
  guessBtn: {
    borderWidth: 1,
    maxWidth: 140,
    borderColor: "#333533",
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 60,
    alignItems: "center",
    backgroundColor: "#FAA307",
  },
  guessBtnText: {
    color: "#333533",
    fontWeight: 700,
    fontSize: 20,
  },
  messageContainer: {
    alignItems: 'center'
  },
  message: {
    fontSize: 24,
    fontWeight: 600,
    color: "#008000",
  },
  wrongMessage: {
    fontSize: 24,
    fontWeight: 600,
    color: "#D00000",
  },
  scoreContainer: {
    borderTopColor: "#333533",
    borderTopWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,

  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: 700,
    paddingVertical: 6,
  },
  score: {
    fontSize: 18,
    fontWeight: 600,
    paddingBottom: 4,
  },
  resetBtn: {
    borderWidth: 1,
    maxWidth: 240,
    borderColor: "#333533",
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 60,
    alignItems: "center",
    backgroundColor: "#D6D6D6",
  },
  resetBtnText: {
    color: '#333533',
    fontWeight: 600,
    fontSize: 18,
  },
});
