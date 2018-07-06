import { StudentDetails } from "./studentDetailsModel";
import { StaffDetailsModel } from "./staffDetailsModel";

export class UserProfileDetail {
    userid: number;
    firstName: string;
    lastName: string;
    middleName: string;
    userCode: string;
    email: string;
    aboutMe: string;
    mobile: string;
    userRoleId: any;
    dob: string;
    createdBy: number;
    firstNameFather: string;
    lastNameFather: string;
    firstNameMother: string;
    lastNameMother: string;
    fatherContact: string;
    sex: number;
    studentDetail: StudentDetails;
    staff: StaffDetailsModel;
    profileImage: string;
    roleName: string;
    schoolID: number;
}