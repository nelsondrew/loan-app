const BASE_URL = 'http://localhost:8080'

export async function sendOtp(phoneNumber) {
    const url = `${BASE_URL}/send-otp-bigdot`;

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
