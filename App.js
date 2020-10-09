import React from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";

const App = () => {
  const translationValue = React.useMemo(
    () => new Animated.ValueXY({ x: 0, y: 0 }),
    []
  );

  const opacityValue = React.useMemo(() => new Animated.Value(1), []);

  const panResponder = React.useMemo(() => {
    let offsetX = 0;
    let offsetY = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.timing(opacityValue, {
          toValue: 0.5,
          useNativeDriver: true,
          duration: 200,
        }).start();
      },
      onPanResponderRelease: () => {
        Animated.timing(opacityValue, {
          toValue: 1,
          useNativeDriver: true,
          duration: 200,
        }).start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        translationValue.x.setValue(dx + offsetX);
        translationValue.y.setValue(dy + offsetY);
      },

      onPanResponderEnd: (_, { dx, dy }) => {
        translationValue.x.setValue(dx + offsetX);
        translationValue.y.setValue(dy + offsetY);

        offsetX += dx;
        offsetY += dy;
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.canvas}>
        <Animated.View
          style={[
            styles.cube,
            { opacity: opacityValue },
            {
              transform: translationValue.getTranslateTransform(),
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  canvas: {
    flex: 1,
  },
  cube: {
    width: 150,
    height: 150,
    backgroundColor: "red",
    borderRadius: 10,
  },
});
