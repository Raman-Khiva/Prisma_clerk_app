import prisma from "../config/prisma.js";
import logger from "../utils/logger.js";
export const syncUser = async (req, res) => {
  logger.enter("Sync User");
  try {
    const auth = req.auth();
    logger.info("Auth object ", auth);
    const { userId } = auth;
    const clerkId = userId;
    logger.info(`Syncing user with clerkId ${clerkId}...`);

    let user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
    });
    logger.info(
      `User with clerkId ${clerkId} ${user ? "found" : "not found"}, syncing...`,
    );
    if (!user) {
      user = await prisma.user.create({
        clerkId: clerkId,
      });
      logger.info(`User with clerkId ${clerkId} created successfully`);
    }
    logger.success(`User with clerkId ${clerkId} synced successfully`);
    res.status(200).json({
      success: true,
      message: "User synced successfully",
      data: {
        user: user,
      },
    });
  } catch (error) {
    logger.error(`Error syncing user: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error while syncing user",
      error: error,
    });
  }
};
