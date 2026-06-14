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

const validateAdminPasscode = [
    body('passcode')
    .custom(value => {
        if(value !== process.env.ADMIN_PASSCODE){
            throw new Error('Invalid Key!');
        }

        return true;
    })
]

export { validateClubPasscode, validateAdminPasscode};