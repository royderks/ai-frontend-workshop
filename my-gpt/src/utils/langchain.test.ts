import { describe, it, assert } from 'vitest';
import { generateAnswer } from './langchain';

describe('LangChain', () => {
    it('Answers a question', async () => {
        const answer = await generateAnswer(
            'Is the United Kingdom a country?', 
            'Take the role of a {role}, that answers questions in a {style} way with "yes" or "no" only.',
            'encyclopedia',
            'strict'
        );

        assert.equal(answer.trim(), "Yes.");
    });

    it('Answers a question incorrectly', async () => {
        const answer = await generateAnswer(
            'Is Amsterdam a city?', 
            'Take the role of a {role}, that answers questions in a {style} way with "yes" or "no" only.',
            'encyclopedia',
            'strict'
        );
        assert.notEqual(answer.trim(), "No.");
    });
});