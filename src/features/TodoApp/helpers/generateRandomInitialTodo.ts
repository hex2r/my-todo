import { loremIpsum } from "lorem-ipsum"
import { random } from "lodash-es"
import { v7 as uuidv7 } from "uuid"
import type { TodoItemType } from "../types"

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
