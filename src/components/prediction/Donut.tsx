// // @src/App.js
// import React from 'react';
// import { View, StyleSheet, Text, ImageSourcePropType } from "react-native";
// import Svg, { G, Circle } from "react-native-svg";

// interface Candidate {
//     name: string;
//     percentage: number | string;
//     image: ImageSourcePropType;
//     backgroundColor: string[];
// }

// interface DonutCandidate extends Candidate {
//     strokeDashoffset: number;
//     angle: number
// }

// interface Props {
//     candidates: Candidate[]
// }

// const Donut: React.FC<Props> = ({ candidates }) => {
//     const radius = 70;
//     const circleCircumference = 2 * Math.PI * radius;

//     const sumArray = (arr: (number)[]): number => {
//         return arr.reduce((accumulator, currentValue) => accumulator + currentValue)
//     };

//     const calculateCumulativeSum = (inputArray: number[]): number[] => {
//         let cumulativeSum = 0;

//         const cumulativeSumArray = inputArray.map((value) => {
//             cumulativeSum += value;
//             return cumulativeSum;
//         });

//         return [0, ...cumulativeSumArray];
//     };


//     // const groceries = 241;
//     // const bills = 372;
//     // const regular = 188;

//     const total = sumArray(candidates.map(candidate => Number(candidate.percentage)))

//     // console.log(total)

//     const allPercentages = candidates.map(candidate => (Number(candidate.percentage) / total) * 100)

//     const allStrokeDashoffset = allPercentages.map(percentage => circleCircumference - (circleCircumference * percentage) / 100)

//     const allAnglesData = candidates.map((candidate) => (Number(candidate.percentage) / total) * 360)

//     const allAngles = calculateCumulativeSum(allAnglesData)

//     let allData = candidates.map((candidate, index) => (
//         {
//             ...candidate,
//             strokeDashoffset: allStrokeDashoffset[index],
//             angle: allAngles[index]
//         }))

//     return (
//         <View style={styles.container}>
//             <View style={styles.graphWrapper}>
//                 <Svg height="160" width="160" viewBox="0 0 180 180">
//                     <G rotation={-90} originX="90" originY="90">
//                         {total > 0 && (
//                             allData.map((data) =>
//                                 <Circle
//                                     cx="50%"
//                                     cy="50%"
//                                     r={radius}
//                                     stroke={data.backgroundColor[0]}
//                                     fill="white"
//                                     strokeWidth="40"
//                                     strokeDasharray={circleCircumference}
//                                     strokeDashoffset={data.strokeDashoffset}
//                                     rotation={data.angle}
//                                     originX="90"
//                                     originY="90"
//                                     strokeLinecap="round"
//                                 />)
//                         )
//                         }
//                     </G>
//                 </Svg>
//                 <Text style={styles.label}>{total.toFixed(2)}%</Text>
//             </View>
//         </View>
//     );
// };

// export default Donut;


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     graphWrapper: {
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     label: {
//         position: "absolute",
//         textAlign: "center",
//         fontWeight: "700",
//         fontSize: 24,
//     },
// });