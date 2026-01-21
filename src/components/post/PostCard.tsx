import React from "react";
import type { PostSummary } from "../../types/post";

export type PostCardProps = {
  post: PostSummary;
  onClick?: (postId: number) => void;
  className?: string;
};

const PostCard: React.FC<PostCardProps> = ({ post, onClick, className }) => {
  return (
    <article
      className={[
        "rounded-2xl border border-gray-200 bg-white overflow-hidden",
        "hover:shadow-sm transition",
        className ?? "",
      ].join(" ")}
    >
      <button type="button" onClick={() => onClick?.(post.postId)} className="w-full text-left">
        <div className="aspect-[16/9] bg-gray-100">
          {post.thumbnailUrl ? (
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
              thumbnail
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="font-semibold text-gray-900 line-clamp-2">{post.title}</div>

          {post.excerpt ? (
            <div className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</div>
          ) : null}

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="truncate">
              {post.author.nickname}
              <span className="text-gray-400"> · {post.createdAt}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span>👁 {post.viewCount}</span>
              <span>💬 {post.commentsCount}</span>
              <span>♥ {post.likesCount}</span>
            </div>
          </div>

          {post.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((t) => (
                <span
                  key={t.tagId}
                  className="rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-600"
                >
                  #{t.name}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-[11px] text-gray-500">+{post.tags.length - 3}</span>
              )}
            </div>
          ) : null}
        </div>
      </button>

    </article>
  );
};

export default PostCard;