export function collisionManager(player, enemy) {
    if(((player.x + player.width) < enemy.x) || 
    ((enemy.x + enemy.width) < player.x) || 
    ((player.y + player.height) < enemy.y) ||
    ((enemy.y + enemy.height) < player.y))
        return false;
    else
        return true;
}