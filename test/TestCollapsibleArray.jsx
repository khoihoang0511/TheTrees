// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Collapsible from 'react-native-collapsible';


// const TestCollapsibleArray = () => {
//   const [collapsed, setCollapsed] = useState(Array(10).fill(true));

//   const toggleCollapsible = (index) => {
//     const newCollapsed = [...collapsed];
//     newCollapsed[index] = !newCollapsed[index];
//     setCollapsed(newCollapsed);
//   };

//   const collapsibleData = [
//     'Collapsible content 1',
//     'Collapsible content 2',
//     'Collapsible content 3',
//     'Collapsible content 4',
//     'Collapsible content 5',
//     'Collapsible content 6',
//     'Collapsible content 7',
//     'Collapsible content 8',
//     'Collapsible content 9',
//     'Collapsible content 10',
//   ];

//   return (
//     <View>
//       {collapsibleData.map((item, index) => (
//         <View key={index}>
//           <TouchableOpacity onPress={() => toggleCollapsible(index)}>
//             <Text>
//               {collapsed[index] ? 'Expand' : 'Collapse'} #{index + 1}
             
//             </Text>
//           </TouchableOpacity>
//           <Collapsible collapsed={collapsed[index]}>
//             <View>
//               <Text>{item}</Text>
//             </View>
//           </Collapsible>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default TestCollapsibleArray;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

const TestCollapsibleArray = () => {
  // Khai báo và gán mảng datasteps
  const [datasteps, setDatasteps] = useState([
    { 
      idstep: 1,
      title: 'Step 1', 
      detailsteps:[
        {
            iddetailsteps:1,
            description: 'Description for Step 1' 
        }
      ]
    },
    { 
      idstep: 2,
      title: 'Step 2', 
      detailsteps:[
        {
            iddetailsteps:2,
            description: 'Description for Step 2' 
        }
      ]
    },
    { 
      idstep: 3,
      title: 'Step 3', 
      detailsteps:[
        {
            iddetailsteps:3,
            description: 'Description for Step 3' 
        }
      ] 
    },
  ]);

  const [collapsed, setCollapsed] = useState(Array(datasteps.length).fill(true));

  const toggleCollapsible = (index) => {
    const newCollapsed = [...collapsed];
    newCollapsed[index] = !newCollapsed[index];
    setCollapsed(newCollapsed);
  };

  return (
    <View>
      {datasteps.map((step, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => toggleCollapsible(index)}>
            <Text>
              {collapsed[index] ? 'Expand' : 'Collapse'} #{step.idstep} - {step.title}
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed[index]}>
            <View>
              {step.detailsteps.map((detailStep, detailIndex) => (
                <View key={detailIndex}>
                  <Text>{detailStep.description}</Text>
                </View>
              ))}
            </View>
          </Collapsible>
        </View>
      ))}
    </View>
  );
};

export default TestCollapsibleArray;

