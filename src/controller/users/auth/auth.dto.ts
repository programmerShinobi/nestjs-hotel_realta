import { IsEmail, IsEmpty, IsNotEmpty, IsStrongPassword } from "class-validator";

export class bodyLoginDto{
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    userPassword: string;

}

export class bodyRegister1Dto{
    @IsNotEmpty()
    userFullName: string;
    
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;
    
    @IsEmpty()
    userPassword: any; 
    userId: any; 
    userType: any; 
    userCompanyName: any;
    userPhoneNumber: any;
    userModifiedDate: Date;
    bookingOrders: any;
    facilityPriceHistories: any;
    hotelReviews: any;
    orderMenus: any;
    paymentTransactions: any; 
    userAccounts: any;
    userBonusPoints: any;
    userMembers: any;
    userProfiles: any; 
    userRoles: any;
    workOrders: any;
}

export class bodyRegister2Dto{
    @IsNotEmpty()
    @IsStrongPassword()
    uspaPasswordhash: string;
    
    @IsEmpty()
    uspaUserId: number;
    uspaPasswordsalt: string
    uspaUser: any;
}