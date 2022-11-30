import { Status } from "./Status"

export interface Subscription{
  subscriber_id: number | null,
  creator_id: string | null,
  status: Status | null
}