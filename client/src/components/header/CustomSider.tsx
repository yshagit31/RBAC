import { ThemedSiderV2 } from "@refinedev/mui";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
// import {logo,yariga} from "../../assets"

// export const CustomSider = () => {
//   return (
//     <ThemedSiderV2
//       render={({ collapsed }) => (
//         <Box display="flex" alignItems="center" justifyContent="center" p={2}>
//           <Link to="/">
//             <img
//               src={yariga} 
//               alt="Custom Logo"
//               width={collapsed ? 40 : 120} // Adjust size based on collapse state
//             />
//           </Link>
//         </Box>
//       )}
//     />
//   );
// };



// export const CustomSider = () => {
//   return (
//     <ThemedSiderV2
//       render={({ collapsed }) => (
//         <Box display="flex" alignItems="center" justifyContent="center" p={2}>
//           <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
//             {/* ✅ Replace with your logo */}
//             <img
//               src={yariga}  // Change this to your actual logo path
//               alt="Custom Logo"
//               width={collapsed ? 40 : 120} // Adjust size when sidebar is collapsed
//             />
//             {!collapsed && (
//               <Typography variant="h6" ml={1} color="white">
//                 Your Project Name
//               </Typography>
//             )}
//           </Link>
//         </Box>
//       )}
//     />
//   );
// };


// const CustomTitle = ({ collapsed }) => (
//   <ThemedTitleV2
//     collapsed={collapsed}
//     // icon={<YourCustomLogo />} // Replace with your logo component or <img src="path-to-logo" />
//     text="Your Project Name"
//   />
// );

// export default CustomTitle;


export const CustomSider = () => {
  return (
    <ThemedSiderV2
      render={({ collapsed }) => (
        <Box display="flex" alignItems="center" justifyContent="center" p={2}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            {/* ✅ Replace with your logo */}
            <img
            //   src={yariga}  // Change this to your actual logo path
              alt="Custom Logo"
              width={collapsed ? 40 : 120} // Adjust size when sidebar is collapsed
            />
            {!collapsed && (
              <Typography variant="h6" ml={1} color="white">
                Yariga
              </Typography>
            )}
          </Link>
        </Box>
      )}
    />
  );
};


