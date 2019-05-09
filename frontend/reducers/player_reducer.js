import {connect} from 'react-redux';
import {RECEIVE_PLAYER_SONG, TOGGLE_PLAY_PAUSE} from '../actions/player_action';
import merge from 'lodash/merge';


    const defaultState = {
        currentSong: null,
        player: "",
        currentTime: 0,
        duration: 0,
    };

    const PlaybarReducer = (state=defaultState, action) => {
        Object.freeze(state)
        let newState;
        switch (action.type) {
            case RECEIVE_PLAYER_SONG:
                const audio = document.getElementById("playbar-audio-player")
                if (!state.currentSong || (state.currentSong && state.currentSong !== action.song)) {
                    audio.src=action.song.audioFileUrl;
                    audio.play();
                    newState = merge( 
                        state,
                        {},
                        {currentSong: action.song,
                        player: "playing",
                        currentTime: 0,
                        duration: 0,
                        }
                    );
                    return newState;
                } else if (state.currentSong && state.currentSong === action.song) {
                    if (state.player === "playing") {
                        audio.pause();
                        newState = merge(
                        state,
                        {},
                        {[player]:"stopped"}
                        );
                        return newState;
                    } else {
                        audio.play();
                        newState = merge(
                        state, 
                        {},
                        {[player]: "playing"}
                        )
                        return newState;
                    }
                }
            case TOGGLE_PLAY_PAUSE: {
                if (state.player === "playing") {
                    newState = merge(
                    state, 
                    {},
                    {[player]: "stopped"}
                    )
                    return newState;
                } else {
                    newState = (
                    state,
                    {},
                    {[player]: "playing"}
                    )
                    return newState; 
                }
            }
            default:
                return state;
                
        } 
    }

    export default PlaybarReducer; 