export const userQuery: any = (_parent: any, args: any, context: any) => {
  return context.prisma.user.findUnique({
    where: {
      id: parseInt(args.id),
    },
  })
}
