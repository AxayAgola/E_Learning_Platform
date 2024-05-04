import { useState } from 'react'
import { Link, BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

//Default Pages
import DefaultLayout from './default_pages/layouts/default_layout'
import HomePage from './default_pages/Home'
import AboutUs from './default_pages/aboutus'
import ExploreCourses from './default_pages/explore_courses'
import ViewCourse from './default_pages/view_course'
import ViewModule from './default_pages/view_module'
import SignUp from './default_pages/Signup'
import SignIn from './default_pages/Signin'
import AdminLogin from './default_pages/Admin_Login'

//Student Side Pages
import StudentLayout from './student_pages/layouts/student_layout'
import S_Home from './student_pages/home'
import S_Courses from './student_pages/courses'
import S_Profile from './student_pages/myprofile'
import S_LearningJourney from './student_pages/learning_journey'
import S_AccountSettings from './student_pages/account_settings'
import S_GiveFeedback from './student_pages/give_feedback'
import S_TakeQuiz from './student_pages/take_quiz'
import S_Certificates from './student_pages/certificates'
import S_ViewCourse from './student_pages/view_course'
import S_ViewModule from './student_pages/view_module'
import S_PDFViewer from './student_pages/pdf_viewer'

//Teacher Side Pages
import TeacherLayout from './teacher_pages/layouts/teacher_layout'
import T_Home from './teacher_pages/home'
import T_ExpoloreCourses from './teacher_pages/explore_courses'
import T_CourseManage from './teacher_pages/course_manage'
import T_AddCourse from './teacher_pages/add_courses'
import T_AddModule from './teacher_pages/add_module'
import T_EditCourse from './teacher_pages/edit_courses'
import T_ViewCourse from './teacher_pages/view_course'
import T_EditModule from './teacher_pages/edit_modules'
import T_ManageCourse from './teacher_pages/manage_course'
import T_ManageQuiz from './teacher_pages/manage_quiz'
import T_TakeQuiz from './teacher_pages/take_quiz'
import T_AddQuestion from './teacher_pages/add_question'
import T_EditQuestion from './teacher_pages/edit_question'
import T_ViewModule from './teacher_pages/view_module'
import T_AccountSettings from './teacher_pages/account_settings'
import T_GiveFeedback from './teacher_pages/give_feedback'
import T_Profile from './teacher_pages/my_profile'
import T_Certificates from './teacher_pages/certificates'

//Admin Side Pages
import AdminLayout from './admin_pages/layouts/admin_layout'
import A_Home from './admin_pages/home'
import A_ManageCourses from './admin_pages/manage_courses'
import A_AddCourse from './admin_pages/add_course'
import A_AddModule from './admin_pages/add_module'
import A_EditModule from './admin_pages/edit_modules'
import A_ViewCourse from './admin_pages/view_course'
import A_EditCourse from './admin_pages/edit_courses'
import A_ManageTeachers from './admin_pages/manage_teachers'
import A_AddTeachers from './admin_pages/add_teacher'
import A_EditTeachers from './admin_pages/edit_teacher'
import A_ManageStudents from './admin_pages/manage_students'
import A_AddStudents from './admin_pages/add_students'
import A_EditStudents from './admin_pages/edit_students'
import A_ManageQuiz from './admin_pages/manage_quiz'
import A_AddQuestion from './admin_pages/add_question'
import A_EditQuestion from './admin_pages/edit_question'
import A_Feedbacks from './admin_pages/feedbacks'
import A_AccountSettings from './admin_pages/accounts_settings'
import A_ManageFeedback from './admin_pages/manage_feedback'
import A_AdminProfile from './admin_pages/admin_profile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="ExploreCourses" element={<ExploreCourses />} />
            <Route path="ViewCourse/:id" element={<ViewCourse />} />
            <Route path="ViewModule/:id" element={<ViewModule />} />
            <Route path="Signin" element={<SignIn />} />
            <Route path="Signup" element={<SignUp />} />
            <Route path="AdminLogin" element={<AdminLogin />} />
          </Route>

          <Route path="/Student/:name?" element={<StudentLayout />}>
            <Route index element={<S_Home />} />
            <Route path="Courses" element={<S_Courses />} />
            <Route path="ViewCourse/:id" element={<S_ViewCourse />} />
            <Route path="ViewModule/:id" element={<S_ViewModule />} />
            <Route path="TakeQuiz/:id" element={<S_TakeQuiz />} />
            <Route path="StudentProfile" element={<S_Profile />} />
            <Route path="LearningJourney" element={<S_LearningJourney />} />
            <Route path="AccountSettings" element={<S_AccountSettings />} />
            <Route path="GiveFeedback" element={<S_GiveFeedback />} />
            <Route path="Certificates" element={<S_Certificates />} />
            <Route path="GetCertificate/:id" element={<S_PDFViewer />} />
          </Route>

          <Route path="/Teacher" element={<TeacherLayout />}>
            <Route index element={<T_Home />} />
            <Route path="ExploreCourses" element={<T_ExpoloreCourses />} />
            <Route path="AddCourses" element={<T_AddCourse />} />
            <Route path="ViewCourse/:id" element={<T_ViewCourse />} />
            <Route path="ViewModule/:id" element={<T_ViewModule />} />
            <Route path="AddModule/:id" element={<T_AddModule />} />
            <Route path="EditModule/:id" element={<T_EditModule />} />
            <Route path="ManageCourse/:id" element={<T_ManageCourse />} />
            <Route path="TakeQuiz/:id" element={<T_TakeQuiz />} />
            <Route path="ManageQuiz/:id" element={<T_ManageQuiz />} />
            <Route path="AddQuestion/:id" element={<T_AddQuestion />} />
            <Route path="EditQuestion/:qid" element={<T_EditQuestion />} />
            <Route path="EditCourses/:id" element={<T_EditCourse />} />
            <Route path="CourseManage" element={<T_CourseManage />} />
            <Route path="TeacherProfile" element={<T_Profile />} />
            <Route path="TeacherSettings" element={<T_AccountSettings />} />
            <Route path="GiveFeedback" element={<T_GiveFeedback />} />
            <Route path="Certificates" element={<T_Certificates />} />
            <Route path="GetCertificate/:id" element={<S_PDFViewer />} />
          </Route>

          <Route path="/Admin" element={<AdminLayout />}>
            <Route index element={<A_Home />} />
            <Route path="ManageCourses" element={<A_ManageCourses />} />
            <Route path="AddCourse" element={<A_AddCourse />} />
            <Route path="ViewCourse/:id" element={<A_ViewCourse />} />
            <Route path="EditCourses/:id" element={<A_EditCourse />} />
            <Route path="ManageTeachers" element={<A_ManageTeachers />} />
            <Route path="AddModule/:id" element={<A_AddModule />} />
            <Route path="EditModule/:id" element={<A_EditModule />} />
            <Route path="ManageQuiz/:id" element={<A_ManageQuiz />} />
            <Route path="AddQuestion/:id" element={<A_AddQuestion />} />
            <Route path="EditQuestion/:qid" element={<A_EditQuestion />} />
            <Route path="AddTeacher" element={<A_AddTeachers />} />
            <Route path="EditTeachers/:id" element={<A_EditTeachers />} />
            <Route path="ManageStudents" element={<A_ManageStudents />} />
            <Route path="AddStudent" element={<A_AddStudents />} />
            <Route path="EditStudents/:id" element={<A_EditStudents />} />
            <Route path="AdminProfile" element={<A_AdminProfile />} />
            <Route path="AdminSettings" element={<A_AccountSettings />} />
            <Route path="Feedbacks" element={<A_Feedbacks />} />
            <Route path="ManageFeedbacks/:id" element={<A_ManageFeedback />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
