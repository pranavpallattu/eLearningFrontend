import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// register api for users

export const registerApi=async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/register`,reqBody,"")
}

// login Api admin and users
 export const loginApi=async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/login`,reqBody,"")
 }

//  add course

export const addCourseApi=async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/add-course`,reqBody,reqHeader)
}

// get course

export const getCourseApi=async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/get-courses`,"",reqHeader)
}

// add lectures

export const addLectureApi=async(id,reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/addlectures/${id}`,reqBody,reqHeader)
}

// get lectures

export const getLectureApi=async(id,reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/getlectures/${id}`,"",reqHeader)
}

// get available courses on userhome

export const getUserCoursesApi = async () => {
    return await commonApi("GET", `${serverUrl}/availablecourses`);
  };
  