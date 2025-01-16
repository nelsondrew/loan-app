const BASE_URL = 'https://nodejs-gcp-app-kr63km7dxa-uc.a.run.app'

export async function sendOtp(phoneNumber, simulateStage) {
    const url = `${BASE_URL}/send-otp`;

    const payload = {
        phoneNumber: phoneNumber
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const stage = data?.stage;
        const applicantDetails = data?.applicantDetails;
        simulateStage({ stage, applicantDetails })
        console.log(data);  // Handle the response data (e.g., OTP response)
        return data;

    } catch (error) {
        console.error('There was an error with the request:', error);
        return {
            error: "unable to send otp",
            msg: error?.message,
        }
    }
}

export async function verifyOtp(phoneNumber, otp) {
    const url = `${BASE_URL}/verify-otp`;

    const payload = {
        phoneNumber: phoneNumber,
        otp: otp
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);  // Handle the response data (e.g., OTP verification result);
        return data;
    } catch (error) {
        console.error('There was an error with the request:', error);
        return {
            error: "otp couldnt be verified",
            message: error?.message,
        }
    }
}

export async function panDetailsApi({
    panNumber,
    panName,
    dateOfBirth,
    phoneNumber
}) {
    const url = `${BASE_URL}/update-details?stage=1`
    const payload = {
        panNumber,
        panName,
        dateOfBirth,
        phoneNumber
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('There was an error with the request:', error);
        return {
            error: "unable to update pan details",
            msg: error?.message,
        }
    }
}

export async function aadhaarDetailsApi({
    aadhaarNumber,
    phoneNumber
}) {
    const url = `${BASE_URL}/update-details?stage=2`
    const payload = {
        aadhaarNumber,
        phoneNumber

    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('There was an error with the request:', error);
        return {
            error: "unable to update aadhaar details",
            msg: error?.message,
        }
    }
}


export async function additionalDetailsApi({
    email,
    salary,
    employmentType,
    phoneNumber
}) {
    const url = `${BASE_URL}/update-details?stage=3`
    const payload = {
        PersonalEmailId: email,
        MonthlySalary: salary,
        EmploymentType: employmentType,
        phoneNumber
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('There was an error with the request:', error);
        return {
            error: "unable to update aadhaar details",
            msg: error?.message,
        }
    }
}

export async function workDetailsApi({
    workemailAddress,
    officeAddress,
    uploadUrls,
    personalAddress,
    currentCity,
    currentOngoingLoans,
    stayingIn,
    phoneNumber,
}) {
    const [MonthOneSalarySlipUrl, MonthTwoSalarySlipUrl, MonthThreeSalarySlipUrl] = uploadUrls;

    const url = `${BASE_URL}/update-details?stage=4`
    const payload = {
        MonthOneSalarySlipUrl,
        MonthTwoSalarySlipUrl,
        MonthThreeSalarySlipUrl,
        CurrentOngoingLoans: currentOngoingLoans,
        Address: personalAddress,
        CurrentCity: currentCity,
        OfficeAddress: officeAddress,
        WorkEmailAddress: workemailAddress,
        StayingIn: stayingIn,
        phoneNumber,
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('There was an error with the request:', error);
        return {
            error: "unable to update aadhaar details",
            msg: error?.message,
        }
    }
}


export async function verifyPaymentApi({
    phoneNumber
}) {
    const url = `${BASE_URL}/update-details?stage=5`
    const payload = {
        phoneNumber
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('There was an error with the request:', error);
        return {
            error: "unable to update aadhaar details",
            msg: error?.message,
        }
    }
}

export const createCashfreeOrder = async ({ amount, customerEmail, customerPhone, customerId, returnUrl }) => {
    const url = `${BASE_URL}/create-order`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                customerEmail,
                customerPhone,
                customerId,
                returnUrl,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create Cashfree order');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating Cashfree order:', error.message);
        return {
            error: "unable to update aadhaar details",
            msg: error?.message,
        }
    }
};
