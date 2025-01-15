export type ApplicantDetails = {
    userId: string;
    phoneNumber: string;
    phoneVerified: boolean;
    aadharNumber: string;
    aadharVerified: boolean;
    PersonalEmailId: string;
    EmploymentType: string;
    MonthlySalary: string;
    WorkEmailAddress: string;
    OfficeAddress: string;
    MonthOneSalarySlipUrl: string;
    MonthTwoSalarySlipUrl: string;
    MonthThreeSalarySlipUrl: string;
    CurrentCity: string;
    CurrentOngoingLoans: string;
    StayingIn: string;
    processingFeesPaid: boolean;
    panVerified: boolean;
    dob: string; // ISO date string
    panName: string;
    panNumber: string;
};