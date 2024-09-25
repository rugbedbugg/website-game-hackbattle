import java.awt.*;
import javax.swing.*;
import java.awt.event.*;
import java.util.Random;
import java.util.ArrayList;

public class SpaceInvaders extends JPanel {
    //board
    int tileSize = 32;
    int rows = 16;
    int columns = 16;
    int boardWidth =  tileSize*columns; //32*16
    int boardHeight = tileSize*rows; 

    SpaceInvaders() {
        setPreferredSize(new Dimension(boardWidth, boardHeight));
        setBackground(Color.black);
        

    }

    

}
