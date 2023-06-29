import { GameService } from './game.service';
import { Body, Controller, Get, Patch, Req , Post } from '@nestjs/common';
// import { userDto } from './user.dto';

@Controller('game')
export class GameController {
	constructor(private gameService: GameService) {}

    @Post('game')
    game(@Body() dto: object) {
        return this.gameService.game(dto)
    }

    @Post('getgame')
    getGame(@Body() dto: object) {
        return this.gameService.getGame(dto)
    }

    @Post('getgame2')
    getGame2(@Body() dto: object) {
        return this.gameService.getGame2(dto)
    }

    @Post('ladder')
    ladder() {
        return this.gameService.ladder()
    }
}
