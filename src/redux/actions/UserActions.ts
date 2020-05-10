

// This is a pattern I like to follow. Anytime we have to compare static strings that share a 'group', make them enums.
// These actions will be used to tell the reducer what we are trying to do.
export enum EUserActions {

    CHANGE_USER = 'CHANGE_USER'

}

// An action in Redux is kind of like a message.
// It basically says, "Hey Redux, go do this". What it does is the 'type' field.
// Many times, Redux can't do what you ask of it because it needs more information, I'm also giving it the information here as 'username'.
export function changeUser(_id: string, firstName: string, lastName: string, email: string) {

    // Actions are simply objects, nothing more.
    // I'm basically saying to Redux "CHANGE USER" with a variable attached to my sentence.
    // The reducer will have to be programmed to look for the variable attached to the command.
    return {

        type: EUserActions.CHANGE_USER,
        _id,
        firstName,
        lastName,
        email,

    }

}

export function logoutUser() {

    // Actions are simply objects, nothing more.
    // I'm basically saying to Redux "CHANGE USER" with a variable attached to my sentence.
    // The reducer will have to be programmed to look for the variable attached to the command.
    return {

        type: EUserActions.CHANGE_USER,
        _id: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,

    }

}