import { loremIpsum } from "lorem-ipsum"
import type { TodoItemType } from "../types"
import { random } from "lodash-es"
import { v7 as uuidv7 } from "uuid"

export function generateRandomInitialTodos(
  min: number,
  max: number,
): TodoItemType[] {
  return Array.from({ length: random(min, max) }).map(() => ({
    id: uuidv7(),
    title: `Demo item, ${loremIpsum({ count: random(1, 2) })}`,
    completed: Boolean(random(0, 1)),
  }))
}
