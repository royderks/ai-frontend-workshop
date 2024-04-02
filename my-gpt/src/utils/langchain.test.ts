import { describe, it, assert } from 'vitest';
import { generateAnswer } from './langchain';

describe('LangChain', () => {
    it('Answers a question', async () => {
        const answer = await generateAnswer('United Kingdom', 'Is the following {question} a country, answer "yes" or "no" only.');

        assert.equal(answer.trim(), "Yes");
    });

    it('Answers a question incorrectly', async () => {
        const answer = await generateAnswer('Amsterdam', 'Is the following {question} a country, answer "yes" or "no" only.');

        assert.equal(answer.trim(), "no");
    });
});