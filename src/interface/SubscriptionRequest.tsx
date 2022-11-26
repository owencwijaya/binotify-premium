import { Status } from "./Status"

export interface SubscriptionRequest {
  subscriber_id: number | null,
  username: string | null,
  creator_id: number | null,
  penyanyi: string | null,
  status: Status
}