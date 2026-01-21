import React from "react";
import type { PostSummary } from "../../types/post";

export type PostCardProps = {
    post: PostSummary;
    onClick?: (postId: number) => void;
    onClickAuthor?: (userId: number) => void;
    className?: string;
};

const PostCard: React.FC<PostCardProps> = ({ post, onClick, onClickAuthor, className }) => {
    return (
        <article
            className={[
                "rounded-2xl border border-gray-200 bg-white overflow-hidden",
                "hover:shadow-sm transition",
                className ?? "",
            ].join(" ")}
        >
            <button type="button" onClick={() => onClick?.(post.postId)} className="w-full text-left">
                <div className="h-40 bg-gray-100">
                    {post.thumbnailUrl ? (
                        <img
                            src={post.thumbnailUrl}
                            alt={post.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                            <div className="text-center px-4">
                                <div className="mt-1 text-sm font-semibold text-gray-700 line-clamp-2">
                                    {post.title}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="font-semibold text-gray-900 line-clamp-2">{post.title}</div>

                    {post.excerpt ? (
                        <div className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</div>
                    ) : null}

                    <div className="mt-3 flex items-center justify-between gap-3 text-xs text-gray-500">
                        {/* left: author */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClickAuthor?.(post.author.userId);
                            }}
                            className="flex min-w-0 items-center gap-2 text-left hover:opacity-80 transition"
                        >
                            {/* profile image */}
                            <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                                {post.author.profileImageUrl ? (
                                    <img
                                        src={post.author.profileImageUrl}
                                        alt={post.author.nickname}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-gray-500">
                                        {(post.author.nickname?.[0] ?? "?").toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* name + date */}
                            <div className="min-w-0">
                                <div className="flex items-baseline gap-2 min-w-0">
                                    <span className="truncate text-[13px] font-bold text-gray-900">
                                        {post.author.nickname}
                                    </span>
                                    <span className="shrink-0 text-gray-400">
                                        · {post.createdAt}
                                    </span>
                                </div>
                            </div>
                        </button>

                        {/* right: stats */}
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