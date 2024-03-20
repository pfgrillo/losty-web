export interface MessageInterface extends Document {
  readonly messages: { text: string; from: string }[];
  readonly host: string;
  readonly guest: string;
  readonly chatRoom: string;
}
