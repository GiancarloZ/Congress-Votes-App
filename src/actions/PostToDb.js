import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const PostToDb = () => {
    
    function postMember(){
        fetch("http://localhost:3000/api/v1/members", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }    
    useEffect(() => {
        postMember();
    });
              
    return (
        null
    )
   
}
export default PostToDb
// const PostToDb = () => {
//     const dispatch = useDispatch()
    
//     function postMember(){
//         // return dispatch => {
//         //     dispatch({
//         //         type: 'POST_MEMBERS',
//         //       });
//                fetch("http://localhost:3000/api/v1/members", {
//                 method: 'GET',
//                 // headers: {
//                 //     // Accept: 'application/json',
//                 //   'Content-Type': 'application/json'
//                 // },
//                 // body: JSON.stringify({ members: members})
//               })
//               .then(res => res.json())
//               .then(data => console.log(data))  
//               .catch(error => console.log(error)
//               );
//         }
//     // }

//     useEffect(() => {
//         postMember();
//     });

//         // return dispatch => {
//         //     dispatch({
//         //         type: 'POST_MEMBERS',
//         //     });
//         //  fetch('http://localhost:3000/api/v1/members', {
//         //         method: 'GET'
//         //     })
//         //     .then(res => res.json())
//         //     .then(members => console.log(members))
//             // }
//         // }
//         // useEffect(() => {
//         //     dispatch(postMember());
//         // }, []);
     
// }

// export default PostToDb
