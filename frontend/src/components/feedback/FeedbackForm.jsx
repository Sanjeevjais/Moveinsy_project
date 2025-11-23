// // import { useState } from "react";
// // import { submitFeedback } from "../../api/feedbackApi";

// // export default function FeedbackForm({ config }) {
// //   const [type, setType] = useState("DRIVER");
// //   const [entityId, setEntityId] = useState("");
// //   const [rating, setRating] = useState(3);
// //   const [comment, setComment] = useState("");
// //   const [message, setMessage] = useState("");

// //   const allowed = config.feedbackFlags;

// //   const submit = async (e) => {
// //     e.preventDefault();
// //     await submitFeedback({ entityType: type, entityId, rating, comment });
// //     setMessage("Feedback Submitted!");
// //     setEntityId("");
// //     setComment("");
// //   };

// //   return (
// //     <form onSubmit={submit}>
// //       <h2>Submit Feedback</h2>

// //       <select value={type} onChange={(e) => setType(e.target.value)}>
// //         {allowed.enableDriver && <option>DRIVER</option>}
// //         {allowed.enableTrip && <option>TRIP</option>}
// //         {allowed.enableApp && <option>APP</option>}
// //         {allowed.enableMarshal && <option>MARSHAL</option>}
// //       </select>

// //       <input placeholder="Entity ID" value={entityId} onChange={(e) => setEntityId(e.target.value)} required />

// //       <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />

// //       <textarea placeholder="Comments..." value={comment} onChange={(e) => setComment(e.target.value)} />

// //       <button type="submit">Submit</button>

// //       {message && <p style={{ color: "green" }}>{message}</p>}
// //     </form>
// //   );
// // }


// import { useMemo, useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Rating,
//   Grid,
//   Divider
// } from "@mui/material";
// import { submitFeedback } from "../../api/feedbackApi";

// export default function FeedbackForm({ config }) {
//   const flags = config.feedbackFlags || {};

//   const feedbackTypes = useMemo(() => {
//     const list = [];
//     if (flags.enableDriver) list.push({ value: "DRIVER", label: "Driver" });
//     if (flags.enableTrip) list.push({ value: "TRIP", label: "Trip" });
//     if (flags.enableApp) list.push({ value: "APP", label: "Mobile App" });
//     if (flags.enableMarshal) list.push({ value: "MARSHAL", label: "Marshal" });
//     return list;
//   }, [flags]);

//   const [entityType, setEntityType] = useState(
//     feedbackTypes[0]?.value || "DRIVER"
//   );
//   const [entityId, setEntityId] = useState("");
//   const [rating, setRating] = useState(3);
//   const [comment, setComment] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // keep entityType valid if flags change
//   useEffect(() => {
//     if (!feedbackTypes.length) return;
//     if (!feedbackTypes.find((t) => t.value === entityType)) {
//       setEntityType(feedbackTypes[0].value);
//     }
//   }, [feedbackTypes, entityType]);

//   const getEntityLabel = () => {
//     switch (entityType) {
//       case "DRIVER":
//         return "Driver ID";
//       case "TRIP":
//         return "Trip ID";
//       case "APP":
//         return "App Version / Build";
//       case "MARSHAL":
//         return "Marshal ID / Name";
//       default:
//         return "Entity";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage({ type: "", text: "" });

//     try {
//       await submitFeedback({
//         entityType,
//         entityId,
//         rating,
//         comment
//       });

//       setMessage({
//         type: "success",
//         text: "Feedback submitted successfully. Thank you!"
//       });
//       setEntityId("");
//       setComment("");
//       setRating(3);
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text:
//           err?.response?.data?.message ||
//           "Failed to submit feedback. Please try again."
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!feedbackTypes.length) {
//     return (
//       <Card className="w-full max-w-xl shadow-lg">
//         <CardContent className="p-6">
//           <Typography variant="h6" align="center">
//             Feedback is currently disabled.
//           </Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="w-full max-w-xl shadow-lg">
//       <CardContent className="p-6">
//         <Typography variant="h5" className="font-semibold mb-1">
//           Share your feedback
//         </Typography>
//         <Typography variant="body2" color="text.secondary" className="mb-4">
//           Help us improve the experience by rating your driver, trip, app or
//           marshal.
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {/* Feedback type */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Feedback for"
//                 value={entityType}
//                 onChange={(e) => setEntityType(e.target.value)}
//                 fullWidth
//                 size="small"
//               >
//                 {feedbackTypes.map((t) => (
//                   <MenuItem key={t.value} value={t.value}>
//                     {t.label}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             {/* Entity ID */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label={getEntityLabel()}
//                 value={entityId}
//                 onChange={(e) => setEntityId(e.target.value)}
//                 fullWidth
//                 required
//                 size="small"
//               />
//             </Grid>

//             {/* Rating */}
//             <Grid item xs={12}>
//               <Divider className="my-2" />
//               <Typography variant="subtitle2" className="mb-1">
//                 Rating
//               </Typography>
//               <div className="flex items-center gap-3">
//                 <Rating
//                   name="rating"
//                   value={rating}
//                   onChange={(e, value) => setRating(value || 3)}
//                   precision={1}
//                 />
//                 <Typography variant="body2">{rating}/5</Typography>
//               </div>
//             </Grid>

//             {/* Comment */}
//             <Grid item xs={12}>
//               <TextField
//                 label="Comments (optional)"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 fullWidth
//                 multiline
//                 minRows={3}
//                 size="small"
//               />
//             </Grid>

//             {/* Message */}
//             <Grid item xs={12}>
//               {message.text && (
//                 <Typography
//                   variant="body2"
//                   className={
//                     message.type === "error"
//                       ? "text-red-500"
//                       : "text-green-600"
//                   }
//                 >
//                   {message.text}
//                 </Typography>
//               )}
//             </Grid>

//             {/* Submit */}
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 disabled={submitting}
//                 className="normal-case"
//               >
//                 {submitting ? "Submitting..." : "Submit Feedback"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { submitFeedback } from "../../api/feedbackApi";

export default function FeedbackForm({ data , setFeedBackForm}) {
  // console.log("data in feedback form",data);
  const flags = {
     feedbackFlags: {
    enableDriver: true,
    enableTrip: true,
    enableApp: true,
    enableMarshal: true,
  },
  alertThreshold: 2.5, // for analytics (drivers below this flagged)
} // config.feedbackFlags || {};

  const feedbackTypes = useMemo(() => {
    const list = [];
    list.push({ value: "DRIVER", label: "Driver"  });
    list.push({ value: "TRIP", label: "Trip" });
    list.push({ value: "APP", label: "Mobile App" });
    list.push({ value: "MARSHAL", label: "Marshal" });
  
    return list;
  }, [flags]);

  const [entityType, setEntityType] = useState(
    feedbackTypes[0]?.value || "DRIVER"
  );
  const [entityId, setEntityId] = useState(data.driver._id);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Ensure entityType stays valid if feature flags change
  useEffect(() => {
    if (!feedbackTypes.length) return;
    if (!feedbackTypes.find((t) => t.value === entityType)) {
      setEntityType(feedbackTypes[0].value);
    }
  }, [feedbackTypes, entityType]);

  const getEntityLabel = () => {
    switch (entityType) {
      case "DRIVER":
        return "Driver ID";
      case "TRIP":
        return "Trip ID";
      case "APP":
        return "App Version / Build";
      case "MARSHAL":
        return "Marshal ID / Name";
      default:
        return "Entity";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await submitFeedback({
        entityType,
        entityId,
        ride: data,
        rating,
        comment
      });
      
      setMessage({
        type: "success",
        text: "Feedback submitted successfully. Thank you!"
      });
      setEntityId("");
      setComment("");
      setRating(5);
      setFeedBackForm(false);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err?.response?.data?.message ||
          "Failed to submit feedback. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!feedbackTypes.length) {
    return (
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-lg font-semibold text-slate-800 mb-1">
          Feedback is disabled
        </h2>
        <p className="text-sm text-slate-500">
          No feedback types are currently enabled. Please contact your admin.
        </p>
      </div>
    );


  }

  if(!data){
    <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-lg font-semibold text-slate-800 mb-1">
          Feedback is disabled
        </h2>
        <p className="text-sm text-slate-500">
          No Ride data found. Please contact your admin.
        </p>
      </div>
  }

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-1">
        Share your feedback
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        Help us improve the experience by rating your driver, trip, app, or
        marshal.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Feedback type + entity ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Feedback for
            </label>
            <select
              value={entityType}
              onChange={(e) =>{ setEntityType(e.target.value); 
                if(e.target.value==="DRIVER"){
                  setEntityId(data.driver._id)
                }else if(e.target.value==="TRIP"){
                  setEntityId(data._id );
                }else{
                  setEntityId("");
                }

              }}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500"
            >
              {feedbackTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              {getEntityLabel()}
            </label>
            <input
              value={entityId}
              readOnly
              onChange={(e) => setEntityId(e.target.value)}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${getEntityLabel()}`}
            />
          </div> */}
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Rating</label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="range"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm font-medium w-10 text-right">
              {rating}/5
            </span>
          </div>
        </div>

        {/* Comment */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Comments 
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={3}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us more about your experience"
          />
        </div>

        {/* Status message */}
        {message.text && (
          <p
            className={`text-sm ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
