import reducer from './reducer';

import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('reducer', () => {
    it('should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
    });

    it('should return the state of an uknown action', () => {
        let currentState ={};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });
});

describe('generateAuralUpdate', () => {
    it('should generate an aural update', () => {
        let state = {
            guesses: [42, 75, 10],
            feedback: 'You\'re warm.',
            auralStatus: '' 
        };

        state = reducer(state, generateAuralUpdate());
        expect(state.auralStatus).toEqual('Here\'s the status of the game right now: You\'re warm. You\'ve made 3 guesses. In order of most- to least-recent, they are: 10, 75, 42')
    });
});

describe('restartGame', () => {
    it('should restart the game', () => {
        let state = {
            guesses: [2, 65, 88],
            feedback: 'You\'re cold',
            correctAnswer: 88,
            auralStatus: ''
        }
        const correctAnswer = 25
        state = reducer(state, restartGame(correctAnswer));
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toEqual(correctAnswer);
        expect(state.auralStatus).toEqual('');
    });
});

describe('makeGuess', () => {
    it('should make a guess', () => {
        let state = {
            guesses: [],
            feedback: '',
            correctAnswer: 100
        };

        state = reducer(state, makeGuess(2));
        expect(state.guesses).toEqual([2]);
        expect(state.feedback).toEqual('You\'re Ice Cold...');

        state = reducer(state, makeGuess(55));
        expect(state.guesses).toEqual([2, 55]);
        expect(state.feedback).toEqual('You\'re Cold...');

        state = reducer(state, makeGuess(71));
        expect(state.guesses).toEqual([2, 55, 71]);
        expect(state.feedback).toEqual('You\'re Warm.')

        state = reducer(state, makeGuess(92));
        expect(state.guesses).toEqual([2, 55, 71, 92]);
        expect(state.feedback).toEqual('You\'re Hot!');

        state = reducer(state, makeGuess(100));
        expect(state.guesses).toEqual([2, 55, 71, 92, 100])
        expect(state.feedback).toEqual('You got it!');
    });
});

