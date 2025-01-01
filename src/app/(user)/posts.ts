"use server";

export type Post = {
  id: string;
  comment: string;
  user: {
    icon: string;
    name: string;
  };
  postedAt: string;
};
export async function getPosts({ cursor }: { cursor: string | null }) {
  return {
    next: cursor ? `${cursor}-next` : "next",
    data: [
      {
        id: `${cursor}-1`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-2`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-3`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-4`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-5`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-6`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-7`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-8`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-9`,
        comment: `This is a comment. ${cursor}`,
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
      {
        id: `${cursor}-10`,
        comment: `This is a comment. ${cursor}`,
        userName: "John Doe",
        user: {
          icon: "image.png",
          name: "John Doe",
        },
        postedAt: new Date().toISOString(),
      },
    ],
  };
}
