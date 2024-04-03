import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  Button,
  Alert,
  Image,
} from "react-native";
export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handlePress = (index: number) => {
    if (board[index] || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    if (checkWin(newBoard, currentPlayer)) {
      setModalMessage(`Player ${currentPlayer} Wins!`);
      setIsModalVisible(true);
      setGameOver(true);
      return;
    }
    if (newBoard.every((cell) => cell !== null)) {
      setModalMessage("It's a draw!");
      setIsModalVisible(true);
      setGameOver(true);
      return;
    }
    setCurrentPlayer(currentPlayer === "1" ? "2" : "1");
  };

  const checkWin = (board: any[], player: string) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return lines.some((line) => line.every((index) => board[index] === player));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("1");
    setGameOver(false);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.titleText}>Tic Tac Toe</Text>
          <Text style={styles.playerText}>Player {currentPlayer} turn</Text>
          <View style={styles.board}>
            {board.map((cell, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cell}
                onPress={() => handlePress(index)}
              >
                {cell === "1" && (
                  <Image
                    source={require("./assets/xImage.png")}
                    resizeMode="stretch"
                    style={styles.cellImage}
                  />
                )}
                {cell === "2" && (
                  <Image
                    source={require("./assets/oImage.png")}
                    resizeMode="stretch"
                    style={styles.cellImage}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          {isModalVisible && (
            <>
              <View style={styles.backdrop} />
              <View style={styles.inlineModal}>
                <Text style={styles.modalText}>{modalMessage}</Text>
                <Button
                  title="Play Again"
                  onPress={() => {
                    resetGame();
                    setIsModalVisible(false);
                  }}
                />
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  board: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  cell: {
    width: "33.333%",
    height: "33.333%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  cellText: {
    fontSize: 100,
  },
  playerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 50,
    marginBottom: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    letterSpacing: 0.5,
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  cellImage: {
    width: 60,
    height: 60,
  },
  inlineModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -160 }, { translateY: -90 }], // Adjust based on the modal's size
    width: 320,
    height: 180,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },
});
