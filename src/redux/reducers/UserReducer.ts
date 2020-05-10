import {IUserState} from "../states/IUserState";
import {AnyAction} from "redux";
import {EUserActions} from "../actions/UserActions";

const user = JSON.parse(localStorage.getItem('user') || "{}");

const DEFAULT_STATE: IUserState = user;

// Redux reducers describe how the state should change when given a message.
// Our only message for right now is basically "HEY REDUX! CHANGE THE USERNAME".
// Here, we will define how that should happen.
export function userReducer(state = DEFAULT_STATE, action: AnyAction): IUserState {

    /**
     * Just for reference, here is our message (action) from UsernameActions:
     *
     *     return {
     *         type: EUserActions.CHANGE_USER,
     *         username: username
     *     }
     *
     */

    // Look at the message above, our action type is one of the EUserActions enums.
    // We can handle many types of actions, so switch on the enums
    switch (action.type) {

        // This is why I said to use enums, no concern of mistyping a string here!
        case EUserActions.CHANGE_USER:

            // How should our state change with this action? Keep everything else in the state,
            // which is literally nothing because we only have one variable, and overwrite username with the
            // username supplied by the action
            return {
                ...state,
                _id: action._id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
            };

        // This is a Redux thing, when your store is built, Redux will essentially send a bogus action
        // though to construct your default state. You must return the state here as a default for this.
        default:
            return state;

    }
}

