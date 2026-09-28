import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

type PracticeTrackerProps = {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
};

type StopwatchProps = {
  seconds: number;
  isRunning: boolean;
};

function PracticeTracker({
  solved,
  onSolve,
  onReset,
}: PracticeTrackerProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Practice Tracker</Text>

      <Text style={styles.solvedText}>
        Solved: {solved}
      </Text>

      {solved >= 5 && (
        <Text style={styles.greatJob}>
          Great job!
        </Text>
      )}

      <View style={styles.buttonSpacing}>
        <Button
          title="Solve +1"
          onPress={onSolve}
        />
      </View>

      <Button
        title="Reset"
        onPress={onReset}
      />
    </View>
  );
}

function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return seconds;
}

function Stopwatch({
  seconds,
  isRunning,
}: StopwatchProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        Stopwatch
      </Text>

      <Text style={styles.timer}>
        {formattedTime}
      </Text>

      {isRunning ? (
        <Text style={styles.status}>
          Running...
        </Text>
      ) : (
        <Text style={styles.status}>
          Paused
        </Text>
      )}
    </View>
  );
}

function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  const handleSolve = () => {
    setSolved((s) => s + 1);
  };

  const handleReset = () => {
    setSolved(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Lab Timer & Practice Tracker
      </Text>

      <PracticeTracker
        solved={solved}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      <Stopwatch
        seconds={seconds}
        isRunning={isRunning}
      />

      <View style={styles.controls}>
        <View style={styles.buttonSpacing}>
          <Button
            title="Start"
            onPress={handleStart}
          />
        </View>

        <Button
          title="Stop"
          onPress={handleStop}
        />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return <LabScreen />;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#FCE4EC",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  section: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  solvedText: {
    fontSize: 20,
    marginBottom: 10,
  },

  greatJob: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  timer: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  status: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },

  controls: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },

  buttonSpacing: {
    marginBottom: 10,
  },
});