NAME	= transcendence

COMPOSE	= docker-compose -p $(NAME)

all: $(NAME)

$(NAME):
	$(COMPOSE) up --build -d

start:
	$(COMPOSE) start

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down -v

rebuild: stop all

restart: stop start

prune:
	$(COMPOSE) down -v
	docker system prune --volumes --force --all
	docker image prune --all --force

log-back:
	docker logs backend-transcendence -f

log-db:
	docker logs database-transcendence -f

log-front:
	docker logs frontend-transcendence -f

prisma-studio:
	docker exec -it backend-transcendence sh -c 'npx prisma studio'

clean: down

fclean: clean

re: fclean all

.PHONY: all $(NAME) start stop clean fclean re prune down rebuild restart