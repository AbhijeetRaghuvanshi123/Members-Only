import { body } from "express-validator";

const validateClubPasscode = [
    body('passcode')
    .custom(value => {
        if(value !== process.env.CLUB_PASSCODE){
            throw new Error('Invalid Passcode!');
        }

        return true;
    })
];

export default validateClubPasscode;