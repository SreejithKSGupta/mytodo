export interface Todomodal  {
  id:Date,
  val: string;
  date: Date,
  enddate:Date,
  done:boolean,
  priority:'low' | 'med' | 'high',
  createdAt:Date;
  completedAt:Date|undefined
}
