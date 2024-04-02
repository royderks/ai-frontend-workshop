import { describe, it, assert } from 'vitest';
import { generateAnswer } from './langchain';

describe('LangChain', () => {
    it('Answers a question', async () => {
        const answer = await generateAnswer(
            'Is the United Kingdom a country?', 
            'Take the role of a encyclopedia, that answers questions in a strict way with "yes" or "no" only.'
        );

        assert.equal(answer.trim(), "Yes");
    });

    it('Answers a question incorrectly', async () => {
        const answer = await generateAnswer(
            'Is Amsterdam a city?', 
            'Take the role of a encyclopedia, that answers questions in a strict way with "yes" or "no" only.'
        );
        assert.notEqual(answer.trim(), "No"); 
    });
});