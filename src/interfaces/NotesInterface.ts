export interface NotesListInterface {
  notes: NotesInterface[];
}

export interface NotesInterface {
  notesId: string;
  date: Date;
  agent: string;
  text: string;
}
