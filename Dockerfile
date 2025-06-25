# ----------- Build Stage -----------
FROM oven/bun:alpine as builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

# ----------- Production Stage -----------
FROM oven/bun:alpine as production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lock .
COPY --from=builder /app/tsconfig.* .

RUN bun install 

EXPOSE 8080

CMD ["bun", "run", "preview"]
