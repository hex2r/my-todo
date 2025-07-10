import { loremIpsum } from "lorem-ipsum"
import { getRandomInt } from "../../../helpers/generateRandomInt"
import type { TodoItemType } from "../types"

export function generateRandomInitialTodos(
  min: number,
  max: number,
): TodoItemType[] {
  return Array.from({ length: getRandomInt(min, max) }).map(() => ({
    id: crypto.randomUUID(),
    title: `Demo item, ${loremIpsum({ count: getRandomInt(1, 2) })}`,
    completed: Boolean(getRandomInt(0, 1)),
  }))
}
