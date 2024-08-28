import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').collect()
  },
})

export const add = mutation({
  args: {
    text: v.string(),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('tasks', {
      text: args.text,
      isCompleted: args.isCompleted,
    })
  },
})

export const updateStatus = mutation({
  args: {
    id: v.id('tasks'),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { isCompleted: args.isCompleted })
  },
})

export const deleteTask = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
