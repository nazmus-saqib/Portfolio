// Original PDF artwork and screen exports. Source pixels are preserved in full-size files.
const picture = (stem, title, caption, basis, extension = 'png') => ({
  image: `/projects/signfy/${stem}.webp`,
  fullSize: `/projects/signfy/${stem}.${extension}`,
  title,
  alt: `${title}: ${caption}`,
  caption,
  basis,
  ...((stem.startsWith('initial-screen-') || stem === 'presentation-translate-original') ? { kind: 'phone' } : {}),
});
const early = (page, title, caption) => picture(
  `initial-screen-${String(page).padStart(2, '0')}`, title, caption,
  `Original annotated screen · Initial design.pdf, page ${page}`,
);

export const signfyArtifacts = {
  personas: [
    picture('persona-mark-jenny-original', 'Mark & Jenny', 'Keeping a conversation going across different communication modes.', 'Original persona design · Signfy page.pdf'),
    picture('persona-miller-original', 'Miller', 'Communicating with his sister when a sign is difficult to recall.', 'Original persona design · Signfy page.pdf'),
    picture('persona-henry-rose-original', 'Henry & Rose', 'Learning sign language to communicate with their child.', 'Original persona design · Signfy page.pdf'),
    picture('persona-lily-original', 'Lily', 'Making everyday conversations more comfortable at work.', 'Original persona design · Signfy page.pdf'),
  ],
  sketches: [
    early(1, 'An early entry question', 'The first exploration asks whether signing is the user’s primary communication mode.'),
    early(2, 'Map the translator controls', 'Numbered annotations identify the character, input area, microphone, language choice, and navigation.'),
    early(5, 'Explore the opposite direction', 'The Convert concept places a camera view above the proposed text output and recording action.'),
  ],
  wireframes: [
    early(3, 'Send an input', 'A send action accompanies the translator’s input and output areas.'),
    early(4, 'Type a sentence', 'The keyboard and text field show how a typed-input state changes the available screen space.'),
    early(6, 'Find a conversation', 'Inbox combines search, recent contacts, and message history.'),
    early(7, 'Move from chat to a call', 'The conversation view keeps the video-call action at the top.'),
    early(8, 'Start the call', 'The early call state separates ending the call from its video action.'),
    early(9, 'Read alongside the call', 'A translated-text area sits below the call view in the annotated concept.'),
    early(10, 'Choose a lesson', 'The learning exploration groups lessons by topic and includes a daily lesson entry.'),
  ],
  inspiration: [
    picture('theme-board-original', 'Original theme references', 'The project’s reference board explores character-based signing, language choice, learning, and communication modes.', 'Original reference board · UX Theme, page 4'),
  ],
  presentation: picture('presentation-translate-original', 'Translate: presentation design', 'The presentation version gives Translate a clear heading, a text/microphone input area, a language selector, and green navigation feedback.', 'Original prototype screen · Final presentation, page 5', 'jpg'),
  showcase: [
    picture('presentation-translate-original', 'Translate: presentation design', 'A character visualization sits above text and microphone input, with Translate highlighted in the shared navigation.', 'Original prototype screen · Final presentation, page 5', 'jpg'),
    early(4, 'Text input: early state', 'Type a sentence while keeping the sign-visualization area above the keyboard.'),
    early(5, 'Convert: early state', 'Explore camera-based sign input and the proposed text/speech output area.'),
    early(6, 'Inbox: early state', 'Find a contact or previous conversation before starting a chat or call.'),
    early(9, 'Video call: early state', 'The proposed translated-text area supports reading alongside the call.'),
    early(10, 'Tutorial: early state', 'Choose a topic and open learning content from its own navigation destination.'),
  ],
};
