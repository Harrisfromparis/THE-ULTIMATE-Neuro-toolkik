import { useState } from 'react';

type Props = {
  images: string[]; // paths under /images/programs/
  caption?: string;
  alt?: string;
};

const QUESTIONS = [
  'What makes these dogs the same?',
  'What makes these dogs different?',
  'Which differences are likely due to the camera or lighting?',
  'Which differences reflect the dog itself (body, coat, expression)?',
  'Which image shows the happiest dog? Why?',
  'Give one-sentence personality + name for any dog.'
];

export default function ImageCompare({ images = [], caption, alt }: Props) {
  const [visible, setVisible] = useState(true);
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(''));

  function updateAnswer(idx: number, value: string) {
    const next = answers.slice();
    next[idx] = value;
    setAnswers(next);
  }

  return (
    <section className="max-w-4xl mx-auto my-8 bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Compare these images</h3>
      {caption ? <p className="text-sm text-gray-600 mb-4">{caption}</p> : null}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {images.length === 0 && (
          <div className="col-span-2 text-center text-gray-500 py-8 border rounded">No images provided</div>
        )}
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden rounded border">
            <img
              src={img.startsWith('/') ? img : `/images/programs/${img}`}
              alt={alt || `Sausage dog image ${i + 1}`}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <button
          className="px-3 py-1 mr-2 bg-primary text-white rounded"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? 'Hide Questions' : 'Show Questions'}
        </button>
        <span className="text-sm text-gray-600 ml-2">Try silent observation for 1 minute, then write answers.</span>
      </div>

      {visible && (
        <div className="space-y-3">
          {QUESTIONS.map((q, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-800">{idx + 1}. {q}</label>
              <input
                value={answers[idx]}
                onChange={(e) => updateAnswer(idx, e.target.value)}
                placeholder="Type your answer here"
                className="mt-1 block w-full rounded border px-3 py-2 text-sm"
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={() => alert('Answers saved locally for this session.')}
              className="bg-accent text-white px-4 py-2 rounded"
            >
              Save Answers
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
