import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { prisma } from "@/libs/prismadb";

export const initialProfile = async () => {
  try {
    const activeUser = await currentUser();

    if (!activeUser) {
      return redirectToSignIn();
    }
    if (activeUser.id === undefined) {
      return null;
    }
    const profile = await prisma.user.findUnique({
      where: {
        userId: activeUser.id,
      },
    });

    if (profile) {
      return profile;
    }

    const newProfile = await prisma.user.create({
      data: {
        userId: activeUser.id,
        name: `${activeUser.firstName} ${activeUser.lastName}`,
        //@ts-ignore
        email: activeUser?.emailAddresses[0]?.emailAddress,
      },
    });

    return newProfile;
  } catch (e) {
    console.log(e);
  }
};
