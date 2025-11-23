// // import { useEffect } from "react";
// // import FeedbackForm from "../components/feedback/FeedbackForm";
// // import { useConfigStore } from "../store/configStore";

// // export default function FeedbackPage() {
// //   const { config, loadConfig, loading } = useConfigStore();

// //   useEffect(() => {
// //     loadConfig();
// //   }, []);

// //   // if (loading) return <p>Loading...</p>;

// //   return <FeedbackForm config={config} />;
// // }

// import { useEffect } from "react";
// import { CircularProgress, Typography } from "@mui/material";
// import FeedbackForm from "../components/feedback/FeedbackForm";
// import { useConfigStore } from "../store/configStore";

// export default function FeedbackPage() {
//   const { config, loading, error, loadConfig } = useConfigStore();

//   useEffect(() => {
//     loadConfig();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error || !config) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <Typography color="error">
//           {error || "Unable to load feedback configuration"}
//         </Typography>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
//       <FeedbackForm config={config} />
//     </div>
//   );
// }

import { useEffect } from "react";
import { useConfigStore } from "../store/configStore";
import FeedbackForm from "../components/feedback/FeedbackForm";
import Navbar from "../components/Navbar";

export default function FeedbackPage({data,setFeedBackForm}) {
  const { config, loading, error, loadConfig } = useConfigStore();

  useEffect(() => {
    loadConfig();
  }, []);

  if (!loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-600">sending Feedback...</p>
        </div>
      </div>
    );
  }

  

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
    <FeedbackForm data={data} setFeedBackForm={setFeedBackForm} />
    </div></>
      
    
  );
}
