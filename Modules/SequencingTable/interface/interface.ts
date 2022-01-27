export interface SequencingTableProps {
  onNextPage: (selectedSessions: string[][], totalPrice: number) => void;
  firstScheduleCta: string;
}

export interface SessionTimeProps {
  booked: boolean;
  available: boolean;
  time: string;
  onSelectHandler: (session: SessionData) => void;
  selectedSessoions: ResultData[];
  activeDay: Day;
}

export interface PurchaseSectionProps {
  sessionPrice: number;
  totalPrice: number | any;
  onButtonClick: () => void;
}

export interface DropdownProps {
  optionArray: Day[];
  onSelectedDay: (day: Day) => void;
  activeDay: number;
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
}
export interface Day {
  day: number;
  dayInString: string;
}

export interface Session {
  booked: boolean;
  available: boolean;
  text: string;
}

export interface ResultData {
  selected: boolean;
  time: string;
  day: number | undefined;
  timeArray: string[];
}

export interface SessionData {
  time: string;
  selected: boolean;
}

export interface ErrorProps {
  errorText: string;
}
